-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "hasDiabetes" BOOLEAN NOT NULL DEFAULT false,
    "hasCovid" BOOLEAN NOT NULL DEFAULT false,
    "enrolledDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Participant" ("hasCovid", "hasDiabetes", "height", "id", "name", "weight") SELECT "hasCovid", "hasDiabetes", "height", "id", "name", "weight" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;