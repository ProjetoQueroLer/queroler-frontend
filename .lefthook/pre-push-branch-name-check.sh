#!/bin/sh

branch_name=$(git symbolic-ref --short HEAD)

# Padrão permitido: feat/, fix/, chore/, refactor/, test/, docs/, ci/, build/, perf/, style/
if ! echo "$branch_name" | grep -Eq '^(feat|fix|chore|refactor|test|docs|ci|build|perf|style)/[a-zA-Z0-9._\-]+'; then
  echo "Nome da branch inválido: '$branch_name'"
  echo "O nome da branch deve seguir o padrão: tipo/nome-da-tarefa (ex: feat/login-form)"
  exit 1
fi
