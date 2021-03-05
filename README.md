# bare-bones-node-bounded-context

Bounded context set up with Typescript, Node, Express, Sequelize, Elasticsearch and real time type checking with io-ts.

**Getting elasticsearch running and populated with logstash:**

1. Run the database locally and input some data
2. Run elastic search with docker-compose up --d
3. Install logstash. There is a Homebrew Formula available
4. Copy and paste mariadb_logstash.config and logstash-example-template.json into the root directory of the logstash folder (same directory as the bin). These files must be in the correct directory to work properly
5. Download the maria db jdbc driver: https://mvnrepository.com/artifact/org.mariadb.jdbc/mariadb-java-client/2.7.2
6. Place the .jar in the root directory of the logstash folder
7. Open terminal in the root directory of the logstash folder and run command: bin/logstash -f example_logstash.config

Troubleshooting: Check http://localhost:9200/\_template/logstash-example-template to see if template has been added

Note: There is likely a better way to get this running using docker. Unfortunately, I'm using an M1 mac and a logstash docker image is not yet available for the ARM64 architecture. Using "platform: linux/amd64" in docker-compose seems to download the image fine, but throws an error that I haven't been able to get passed when being run. I'll revist this.
