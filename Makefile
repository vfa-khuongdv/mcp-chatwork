.PHONY: install build start test clean help

# Default target
all: install build

install:
	npm install

build:
	npm run build

start:
	npm start

test:
	npm test

clean:
	rm -rf dist node_modules

reinstall: clean install

help:
	@echo "Available targets:"
	@echo "  make install    - Install dependencies"
	@echo "  make build      - Build the project"
	@echo "  make start      - Run the project"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Remove build artifacts and node_modules"
	@echo "  make reinstall  - Clean and reinstall dependencies"
	@echo "  make all        - Install and build (default)"
