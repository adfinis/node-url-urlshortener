CREATE TABLE urlshortener (
    id SERIAL primary key NOT NULL,
    url TEXT NOT NULL,
    alias VARCHAR(255) NULL,
    exp_date TIMESTAMP NULL,
    visit_count INT NOT NULL DEFAULT 0
);
