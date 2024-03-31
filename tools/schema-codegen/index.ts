import fs from 'fs';
import path from 'path';
import { Model, parsePrismaSchema } from './lib/parse-prisma-schema';

// ---- Constants ---- //
const FOLDER_PATH = 'packages/data-access-db/src/lib';
const FILE_NAME = 'schema.prisma';
// ------------------- //

// ------------------------------------------------------------------------------
// 1. Functions
// ------------------------------------------------------------------------------
const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, 'utf-8');
};

const createFile = (filePath: string, fileContent: string) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
  fs.writeFileSync(path.join(filePath), fileContent, 'utf-8');
};

const replaceFile = (fileContent: string, model: Model) => {
  fileContent = fileContent.replace(/__model__/g, model.model);
  fileContent = fileContent.replace(/__model_plural__/g, model.plural);
  fileContent = fileContent.replace(/__model_plural_kebab__/g, model.pluralKebab);
  fileContent = fileContent.replace(/__model_plural_camel__/g, model.pluralCamel);
  fileContent = fileContent.replace(/__model_kebab__/g, model.kebab);
  fileContent = fileContent.replace(/__model_camel__/g, model.camel);
  fileContent = fileContent.replace(
    /__columns__/g,
    model.columns.map((column) => column.name).join('\n'),
  );
  return fileContent;
};

// ------------------------------------------------------------------------------
// 2. Main
// ------------------------------------------------------------------------------
const filePath = path.join(FOLDER_PATH, FILE_NAME);
const schemaContent = readFile(filePath);
const models = parsePrismaSchema(schemaContent);

// console.log(JSON.stringify(models, null, 2));

models.forEach((model) => {
  const sources = [
    {
      template: 'templates/backend/api/dto/get-xxx-args.dto.ts.txt',
      output: `@generated/${model.kebab}/backend/api/dto/args/get-${model.kebab}-args.dto.ts`,
    },
    {
      template: 'templates/backend/api/dto/create-xxx-input.dto.ts.txt',
      output: `@generated/${model.kebab}/backend/api/dto/input/create-${model.kebab}-input.dto.ts`,
    },
    {
      template: 'templates/backend/api/dto/update-xxx-input.dto.ts.txt',
      output: `@generated/${model.kebab}/backend/api/dto/input/update-${model.kebab}-input.dto.ts`,
    },
    {
      template: 'templates/backend/api/dto/delete-xxx-input.dto.ts.txt',
      output: `@generated/${model.kebab}/backend/api/dto/input/delete-${model.kebab}-input.dto.ts`,
    },
    {
      template: 'templates/backend/api/models/xxx.model.ts.txt',
      output: `@generated/${model.kebab}/backend/api/models/${model.kebab}.model.ts`,
    },
    {
      template: 'templates/backend/api/module/xxxs.module.ts.txt',
      output: `@generated/${model.kebab}/backend/api/${model.pluralKebab}.module.ts`,
    },
    {
      template: 'templates/backend/api/module/xxxs.resolver.ts.txt',
      output: `@generated/${model.kebab}/backend/api/${model.pluralKebab}.resolver.ts`,
    },
    {
      template: 'templates/backend/api/module/xxxs.service.ts.txt',
      output: `@generated/${model.kebab}/backend/api/${model.pluralKebab}.service.ts`,
    },
    {
      template: 'templates/frontend/features/api/xxx.graphql.txt',
      output: `@generated/${model.kebab}/frontend/features/api/${model.kebab}.graphql`,
    },
    {
      template: 'templates/frontend/features/hooks/useXxxDispatcher.ts.txt',
      output: `@generated/${model.kebab}/frontend/features/hooks/use${model.model}Dispatcher.ts`,
    },
    {
      template: 'templates/frontend/features/stores/xxx-atom.ts.txt',
      output: `@generated/${model.kebab}/frontend/features/stores/${model.kebab}-atom.ts`,
    },
  ];

  sources.forEach((source) => {
    let fileContent = readFile(path.join(__dirname, source.template));
    fileContent = replaceFile(fileContent, model);
    const outputPath = path.join(__dirname, source.output);
    createFile(outputPath, fileContent);
  });
});

console.log(`✅ File generated! => ${__dirname}/@generated`);
