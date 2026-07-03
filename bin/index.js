#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ANSI escape codes for colors
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m"
};

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function run() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command !== 'init') {
    console.log(`${colors.cyan}Uso: aether-kit init${colors.reset}`);
    process.exit(1);
  }

  const sourceDir = path.join(__dirname, '..', '.agents');
  const targetDir = path.join(process.cwd(), '.agents');

  if (!fs.existsSync(sourceDir)) {
    console.error(`${colors.red}Erro: Pasta .agents não encontrada no pacote.${colors.reset}`);
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    console.log(`${colors.yellow}Atenção: A pasta .agents já existe neste projeto.${colors.reset}`);
    const answer = await promptUser(`Deseja sobrescrever e mesclar os arquivos existentes com o Aether Kit? (s/n): `);
    if (answer !== 's' && answer !== 'sim' && answer !== 'y' && answer !== 'yes') {
      console.log(`${colors.red}Operação abortada. Nada foi modificado.${colors.reset}`);
      process.exit(0);
    }
  }

  try {
    copyRecursiveSync(sourceDir, targetDir);
    console.log(`${colors.green}Sucesso! Aether Kit inicializado na pasta .agents.${colors.reset}`);
  } catch (err) {
    console.error(`${colors.red}Erro ao copiar os arquivos: ${err.message}${colors.reset}`);
    process.exit(1);
  }
}

run();
