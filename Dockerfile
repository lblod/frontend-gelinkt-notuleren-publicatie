FROM madnificent/ember:3.20.0 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN ember build -prod


FROM redpencil/fastboot-app-server:1.1.0
COPY --from=builder /app/dist /app
