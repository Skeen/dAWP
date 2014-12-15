#!/bin/bash
pdflatex -shell-escape report.tex
mkdir -p output
mv *.pdf output/
mv *.log output/
mv *.aux output/
mv *.out output/
