import fs from "fs";
import path from "path";
import { StandaloneValidator } from "@fastify/ajv-compiler";
import fastify from "fastify";

const factory = StandaloneValidator({
    readMode: false,
    storeFunction (routeOpts, schemaValidationCode) {
        // routeOpts is like: { schema, method, url, httpPart }
        // schemaValidationCode is a string source code that is the compiled schema function
        const fileName = `${routeOpts.method}${routeOpts.url}.js`;
        fs.writeFileSync(path.join(__dirname, fileName), schemaValidationCode)
    }
})

fastify({
    jsonShorthand: false,
    schemaController: {
        compilersFactory: {
            buildValidator: factory
        }
    }
})
