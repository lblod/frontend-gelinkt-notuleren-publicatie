FROM madnificent/ember:5.12.0 as builder

LABEL maintainer="info@redpencil.io"

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN ember build -prod


FROM redpencil/fastboot-app-server:1.3.0
COPY --from=builder /app/dist /app
