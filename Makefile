# Makefile for Sphinx documentation
#

.PHONY: help html linkcheck

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  grammar    to check grammar"
	@echo "  html       to make standalone HTML files"
	@echo "  linkcheck  to verify external links"

grammar:
	write-good `find ./source -name '*.rst'` --passive --so --no-illusion --cliches > build/grammar.txt
	@echo
	@echo "Grammar check finished. The report is in build/grammar.txt."

html:
	sphinx-build source build
	@echo
	@echo "Build finished. The HTML pages are in build."

test:
	sphinx-build -b spelling -D extensions=sphinx_sitemap,sphinx_tabs.tabs,sphinxcontrib.spelling source build
	@echo
	@echo "Build finished. The HTML pages are in build."

linkcheck:
	sphinx-build -b linkcheck source build
	@echo
	@echo "linkcheck finished. The report is in build/output.txt."