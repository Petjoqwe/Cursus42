# Makefile para So Long - Juego Incremental Contemplativo
# Este Makefile proporciona comandos útiles para el desarrollo y despliegue

# Variables
PORT ?= 8000
PYTHON := $(shell which python3 || which python)
NODE := $(shell which node)
NPM := $(shell which npm)

# Colores para output
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

# Objetivo por defecto
.DEFAULT_GOAL := help

# Ayuda
help: ## Muestra esta ayuda
	@echo "$(GREEN)So Long - Makefile$(NC)"
	@echo "Comandos disponibles:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

# Servidor de desarrollo
serve: ## Inicia un servidor local para desarrollo (Puerto 8000 por defecto)
	@echo "$(GREEN)Iniciando servidor en http://localhost:$(PORT)$(NC)"
	@if [ -n "$(PYTHON)" ]; then \
		cd . && $(PYTHON) -m http.server $(PORT); \
	else \
		echo "$(RED)Error: Python no encontrado$(NC)"; \
		exit 1; \
	fi

serve-php: ## Inicia servidor usando PHP (alternativa)
	@echo "$(GREEN)Iniciando servidor PHP en http://localhost:$(PORT)$(NC)"
	@php -S localhost:$(PORT)

# Desarrollo
dev: serve ## Alias para 'serve'

# Validación de archivos
validate: ## Valida la sintaxis de archivos HTML, CSS y JS
	@echo "$(GREEN)Validando archivos...$(NC)"
	@echo "Verificando HTML..."
	@if command -v tidy >/dev/null 2>&1; then \
		tidy -q -e index.html preview.html || echo "$(YELLOW)Advertencias en HTML (usar tidy para más detalles)$(NC)"; \
	else \
		echo "$(YELLOW)tidy no instalado, saltando validación HTML$(NC)"; \
	fi
	@echo "Verificando JavaScript..."
	@if command -v node >/dev/null 2>&1; then \
		node -c script.js && echo "$(GREEN)script.js: OK$(NC)" || echo "$(RED)Error en script.js$(NC)"; \
		node -c images.js && echo "$(GREEN)images.js: OK$(NC)" || echo "$(RED)Error en images.js$(NC)"; \
	else \
		echo "$(YELLOW)Node.js no instalado, saltando validación JS$(NC)"; \
	fi

# Limpieza
clean: ## Limpia archivos temporales y cache
	@echo "$(GREEN)Limpiando archivos temporales...$(NC)"
	@find . -name "*.tmp" -delete
	@find . -name "*.log" -delete
	@find . -name ".DS_Store" -delete
	@find . -name "Thumbs.db" -delete
	@echo "$(GREEN)Limpieza completada$(NC)"

# Preparación para producción
build: validate clean ## Prepara el proyecto para producción
	@echo "$(GREEN)Preparando build de producción...$(NC)"
	@mkdir -p dist
	@cp index.html dist/
	@cp preview.html dist/
	@cp style.css dist/
	@cp script.js dist/
	@cp images.js dist/
	@cp README.md dist/
	@echo "$(GREEN)Build completado en directorio 'dist/'$(NC)"

# Despliegue (preparación)
deploy-prep: build ## Prepara archivos para despliegue
	@echo "$(GREEN)Creando archivo para despliegue...$(NC)"
	@cd dist && tar -czf ../so-long-deploy.tar.gz *
	@echo "$(GREEN)Archivo so-long-deploy.tar.gz creado$(NC)"

# Instalación de dependencias de desarrollo (opcionales)
install-deps: ## Instala dependencias de desarrollo opcionales
	@echo "$(GREEN)Instalando herramientas de desarrollo opcionales...$(NC)"
	@if command -v apt-get >/dev/null 2>&1; then \
		sudo apt-get update && sudo apt-get install -y tidy nodejs npm; \
	elif command -v yum >/dev/null 2>&1; then \
		sudo yum install -y tidy nodejs npm; \
	elif command -v brew >/dev/null 2>&1; then \
		brew install tidy-html5 node; \
	else \
		echo "$(YELLOW)Gestor de paquetes no reconocido. Instala manualmente: tidy, nodejs$(NC)"; \
	fi

# Información del proyecto
info: ## Muestra información del proyecto
	@echo "$(GREEN)=== So Long - Información del Proyecto ===$(NC)"
	@echo "Tipo: Juego web incremental"
	@echo "Archivos principales:"
	@echo "  - index.html ($(shell wc -l < index.html) líneas)"
	@echo "  - script.js ($(shell wc -l < script.js) líneas)"
	@echo "  - images.js ($(shell wc -l < images.js) líneas)"
	@echo "  - style.css ($(shell wc -l < style.css) líneas)"
	@echo "Tamaño total: $(shell du -sh . | cut -f1)"

# Abrir en navegador
open: ## Abre el juego en el navegador por defecto
	@if command -v xdg-open >/dev/null 2>&1; then \
		xdg-open http://localhost:$(PORT); \
	elif command -v open >/dev/null 2>&1; then \
		open http://localhost:$(PORT); \
	else \
		echo "$(YELLOW)Abre manualmente: http://localhost:$(PORT)$(NC)"; \
	fi

# Backup del proyecto
backup: ## Crea un backup del proyecto
	@echo "$(GREEN)Creando backup...$(NC)"
	@tar -czf so-long-backup-$(shell date +%Y%m%d_%H%M%S).tar.gz \
		--exclude='.git' \
		--exclude='dist' \
		--exclude='*.tar.gz' \
		--exclude='*.log' \
		.
	@echo "$(GREEN)Backup creado$(NC)"

# Test rápido
test: validate ## Ejecuta tests básicos del proyecto
	@echo "$(GREEN)Ejecutando tests básicos...$(NC)"
	@echo "Verificando que archivos existen..."
	@test -f index.html && echo "$(GREEN)✓ index.html$(NC)" || echo "$(RED)✗ index.html$(NC)"
	@test -f script.js && echo "$(GREEN)✓ script.js$(NC)" || echo "$(RED)✗ script.js$(NC)"
	@test -f style.css && echo "$(GREEN)✓ style.css$(NC)" || echo "$(RED)✗ style.css$(NC)"
	@test -f images.js && echo "$(GREEN)✓ images.js$(NC)" || echo "$(RED)✗ images.js$(NC)"
	@echo "$(GREEN)Tests completados$(NC)"

# Monitoreo de archivos (requiere inotify-tools)
watch: ## Monitorea cambios en archivos (requiere inotify-tools)
	@if command -v inotifywait >/dev/null 2>&1; then \
		echo "$(GREEN)Monitoreando cambios en archivos...$(NC)"; \
		while inotifywait -e modify *.html *.css *.js; do \
			echo "$(YELLOW)Archivo modificado - ejecutando validación...$(NC)"; \
			make validate; \
		done; \
	else \
		echo "$(RED)inotify-tools no instalado. Usa: sudo apt-get install inotify-tools$(NC)"; \
	fi

# Objetivos que no son archivos
.PHONY: help serve serve-php dev validate clean build deploy-prep install-deps info open backup test watch