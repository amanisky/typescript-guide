# typescript-guide

### 使用 tsconfig.json
+ [tsconfig.json](http://json.schemastore.org/tsconfig)
+ 不带任何输入文件的情况下调用 tsc，编译器会从当前目录开始去查找tsconfig.json 配置文件

```json
{
  "compilerOptions": {
    // 指定模块代码生成方式
    "module": "system",
    // 指定目标版本；默认值：es3；改成 es5，才支持类的存储器
    "target": "es5",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "outDir": "build",
    "sourceMap": false
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```

### ESLint 配置
+ 直接在 package.json 文件里的 eslintConfig 字段指定配置

```json
"eslintConfig": {
  "rules": {
    "eol-last": false
  }
}
```