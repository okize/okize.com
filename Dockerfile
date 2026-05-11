# base image
FROM oven/bun:1.3.11-alpine

# set container working directory
WORKDIR /app

# copy package.json and bun.lock to the container
COPY package.json bun.lock ./

# install deps
# this step is separated from copying the rest of the code to leverage Docker cache
RUN bun install --frozen-lockfile

# copy remainder of application code to the container
COPY . .

# port that the app runs on
EXPOSE 3333

# command to start app
CMD ["bun", "run", "app.ts"]
