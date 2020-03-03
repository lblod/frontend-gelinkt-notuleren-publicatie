FROM madnificent/ember:3.5.0 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN ember build -prod


FROM cecemel/ember-fastboot-proxy-service:0.9.1

COPY --from=builder /app/dist /app
