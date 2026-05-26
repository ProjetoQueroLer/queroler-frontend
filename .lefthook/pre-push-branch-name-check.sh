#!/bin/sh

branch_name=$(git symbolic-ref --short HEAD)

# Padrão permitido: 
# Base: E{número}_HU{número}
# Opcional: _TASK_{número} OU _BUG_{número}
if ! echo "$branch_name" | grep -Eq '^(E[0-9]+_HU[0-9]+(_(TASK|BUG)_[0-9]+)?|E[0-9]+_DT_TASK_[0-9]+)$'; then
  echo "Nome da branch inválido: '$branch_name'"
  echo "--------------------------------------------------------"
  echo "O nome da branch deve seguir um dos padrões abaixo:"
  echo "  - HU principal:  E2_HU2"
  echo "  - Subtask:       E2_HU2_TASK_34"
  echo "  - Bug:           E2_HU2_BUG_2"
  echo "  - DT:            E5_DT_TASK_20"
  echo "--------------------------------------------------------"
  exit 1
fi