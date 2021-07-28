# bare-bones-node-bounded-context

Bounded context set up with Typescript, Node, Express, Sequelize, Elasticsearch and real time type checking with io-ts.

**Getting elasticsearch running and populated with logstash:**

1. Run the database locally and input some data
2. Run elastic search with docker-compose up --d
3. Install logstash. There is a Homebrew Formula available
4. Navigate to the root directory of the logstash folder (same directory as the bin)
5. Create a folder named "configs". Copy and paste logstash-example-template.json and example_logstash.config into the configs folder
6. Download the maria db jdbc driver: https://mvnrepository.com/artifact/org.mariadb.jdbc/mariadb-java-client/2.7.2
7. Place the jdbc driver (the .jar) in the root directory of the logstash folder
8. Open terminal in the root directory of the logstash folder and run command: bin/logstash -f configs/example_logstash.config

<!-- prettier-ignore -->
Troubleshooting: Check http://localhost:9200/_template/logstash-example-template to see if the template has been added successfully

Note: There is likely a better way to get this running using docker. Unfortunately, I'm using an M1 mac and a logstash docker image is not yet available for the ARM64 architecture as of writing this. I'll revist.
