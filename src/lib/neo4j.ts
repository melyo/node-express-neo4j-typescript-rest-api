import * as neo4j from 'neo4j-driver'
import config from './../config'

const host = `${config.database.host}:${config.database.port}`

const auth = neo4j.v1.auth.basic(config.database.user, config.database.password)

export default neo4j.v1.driver(host, auth)
