FROM madnificent/ember:4.12.1-node_18 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN ember build -prod


FROM redpencil/fastboot-app-server:latest
COPY --from=builder /app/dist /app
