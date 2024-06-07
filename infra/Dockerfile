# Use the official MySQL image
FROM mysql:8.0

# Copy the setup SQL file into the container
COPY infra/docker-entrypoint-initdb.d/setup.sql /docker-entrypoint-initdb.d/
