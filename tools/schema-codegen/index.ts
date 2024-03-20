import fs from 'fs';
import path from 'path';
import { Model, parsePrismaSchema } from './lib/parse-prisma-schema';

// ---- Constants ---- //
const FOLDER_PATH = 'packages/api/data-access-db/src/lib';
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
      template: 'templates/dto/get-xxx-args.dto.txt',
      output: `@generated/${model.kebab}/dto/args/get-${model.kebab}-args.dto.ts`
    },
    {
      template: 'templates/dto/create-xxx-input.dto.txt',
      output: `@generated/${model.kebab}/dto/input/create-${model.kebab}-input.dto.ts`
    },
    {
      template: 'templates/dto/update-xxx-input.dto.txt',
      output: `@generated/${model.kebab}/dto/input/update-${model.kebab}-input.dto.ts`
    },
    {
      template: 'templates/dto/delete-xxx-input.dto.txt',
      output: `@generated/${model.kebab}/dto/input/delete-${model.kebab}-input.dto.ts`
    },
    {
      template: 'templates/models/xxx.model.txt',
      output: `@generated/${model.kebab}/models/${model.kebab}.model.ts`
    },
    {
      template: 'templates/module/xxxs.module.txt',
      output: `@generated/${model.kebab}/${model.pluralKebab}.module.ts`
    },
    {
      template: 'templates/module/xxxs.resolver.txt',
      output: `@generated/${model.kebab}/${model.pluralKebab}.resolver.ts`
    },
    {
      template: 'templates/module/xxxs.service.txt',
      output: `@generated/${model.kebab}/${model.pluralKebab}.service.ts`
    }
  ];

  sources.forEach((source) => {
    let fileContent = readFile(path.join(__dirname, source.template));
    fileContent = replaceFile(fileContent, model);
    const outputPath = path.join(__dirname, source.output);
    createFile(outputPath, fileContent);
  });
});

console.log('Done!');
