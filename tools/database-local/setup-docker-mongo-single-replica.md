# prismagraphql/mongo-single-replica

## Reference URL

<https://dev.to/renzhamin/setup-mongodb-replica-set-locally-in-docker-or-with-atlas-for-prisma-orm-54gp>
<https://hub.docker.com/r/prismagraphql/mongo-single-replica>

## Step

### 1. Pull the docker image with

```bash
docker pull prismagraphql/mongo-single-replica:5.0.3
```

### 2. Run the image with this command

```bash
docker run --name docker-mongo --restart always \
      -p 27017:27017 \
      -e MONGO_INITDB_ROOT_USERNAME="monty" \
      -e MONGO_INITDB_ROOT_PASSWORD="pass" \
      -d prismagraphql/mongo-single-replica:5.0.3
```

### 3. Setup the connection URL to `.env.local`

```env
DB_URL="mongodb://monty:pass@localhost:27017/db_name?authSource=admin&directConnection=true"
```

> Replace `db_name` with the name of your database, if it doesn't exist it will be created automatically.

e.g. If you use `mongo_dev` name, write the following.

```env
DB_URL="mongodb://monty:pass@localhost:27017/mongo_dev?authSource=admin&directConnection=true"
```
