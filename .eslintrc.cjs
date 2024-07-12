module.exports = {
    extends: ['@hono/eslint-config'],
    parserOptions: {
      project: ['./tsconfig.json'],
    }, 
    rules: {
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": "off"
    },
    plugins: ["unused-imports"]
}