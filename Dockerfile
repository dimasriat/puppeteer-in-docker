FROM node:18-alpine
RUN apk update

# Installs latest Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

WORKDIR /app
COPY . /app/
RUN yarn
CMD ["yarn", "start"]