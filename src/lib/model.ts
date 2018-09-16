import * as jsStringEscape from 'js-string-escape'
import { head, isBoolean, isNull, isNumber } from 'lodash'
import { parse } from 'parse-neo4j'
import * as uuid from 'uuid/v1'
import logger from './logger'
import neo4j from './neo4j'

export default class Model {
    public db: any

    public id: string

    public label: string

    constructor() {
        this.db = neo4j
        this.label = this.constructor.name
        this.id = 'id'
    }

    public async count() {
        const query = `
            MATCH (node${this.label})
            RETURN count(node)
        `

        return head(await parse(await this.__run(query)))
    }

    public async all() {
        const query = `
            MATCH (node:${this.label})
            RETURN node
        `

        return await parse(await this.__run(query))
    }

    public async find(id: string) {
        const query = `
            MATCH (node:${this.label} { ${this.id}: '${id}' })
            RETURN node
        `

        return head(await parse(await this.__run(query)))
    }

    public async where(properties: object) {
        const query = `
            MATCH (node:${this.label} {${this.__matchProperties(properties)}})
            RETURN node
        `

        return await parse(await this.__run(query))
    }

    public async create(properties: any) {
        const now = new Date().toISOString()
        properties.id = uuid()
        properties.created_at = now
        properties.updated_at = now
        const query = `
            CREATE (node:${this.label} { ${this.__matchProperties(properties)} })
            RETURN node
        `

        return head(await parse(await this.__run(query)))
    }

    public async update(id: string, properties: any) {
        const now = new Date().toISOString()
        properties.updated_at = now
        const query = `
            MATCH (node:${this.label} {${this.id}: '${id}'})
            SET node += {${this.__matchProperties(properties)}}
            RETURN node
        `

        return head(await parse(await this.__run(query)))
    }

    protected async __run(query: string) {
        try {
            const session  = this.db.session()
            const result = await session.run(query)
            logger.info(`[NEO4J] ${query.replace(/\s\s+/g, ' ').trim()}`)
            session.close()

            return result
        } catch (error) {
            const errMessage = `[NEO4J] ${error.message}`
            logger.warn(`[NEO4J] ${query.replace(/\s\s+/g, ' ').trim()}`)
            logger.error(errMessage)

            throw new Error(errMessage)
        }
    }

    protected __matchProperties(properties: object) {
        const propArray = []
        for (const property in properties) {
            if (properties[property] !== undefined) {
                const prop = properties[property]
                if (isNumber(prop) || isNull(prop) || isBoolean(prop)) {
                    propArray.push(`${property}: ${prop}`)
                } else {
                    propArray.push(`${property}: '${jsStringEscape(properties[property])}'`)
                }
            }
        }

        return propArray.join(', ')
    }
}
