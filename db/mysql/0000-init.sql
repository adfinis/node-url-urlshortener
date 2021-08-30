CREATE TABLE urlshortener (
    id INT AUTO_INCREMENT primary key NOT NULL,
    url TEXT NOT NULL,
    alias VARCHAR(255) NULL,
    exp_date DATETIME NULL,
    visit_count INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
