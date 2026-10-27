# CampusGo: passo a passo

## 1. Git e pastas
```bash
cd IESB-PDM-OESTE
git checkout main && git pull
git checkout -b feature/campus-go
mkdir praticas/campusGo && cd praticas/campusGo
```

## 2. Criar o projeto
```bash
npx create-expo-app@latest campus-go --template blank
cd campus-go
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar @expo/vector-icons
npx expo install @react-native-async-storage/async-storage expo-image-picker expo-location expo-notifications expo-haptics
rm App.js index.js
```

## 3. Configurar
- package.json: `"main": "expo-router/entry"`
- app.json: dentro de `"expo"`, adicione `"scheme": "campusgo"`
  (se o `npx expo install expo-router` não tiver adicionado, inclua também
  `"plugins": ["expo-router"]`)
- .gitignore: adicione uma linha com `.env`  (o template NÃO ignora o .env!)

## 4. Copiar os arquivos
Copie as pastas app/, components/, hooks/, services/, store/ e o .env.example
deste pacote para dentro de campus-go/. Depois SUBSTITUA store/expenses-context.js
pelo seu arquivo da atividade anterior (o do pacote é só um stub).

```bash
cp .env.example .env
npx expo start -c
```

## 5. Roteiro de teste (o mesmo do professor)
Siga a tabela de 14 passos do PDF. Para o erro (passo 13), troque a URL no .env
por algo inválido e reinicie com `npx expo start -c`.

## 6. Entrega
```bash
git add .
git status        # confirme: sem node_modules e sem .env
git commit -m "feat: atividade CampusGo (Aula 10)"
git push -u origin feature/campus-go
```
Abra o PR no GitHub (feature/campus-go → main), com nome, matrícula, lista de
tarefas/bônus e os prints, e compartilhe o link na entrega.
