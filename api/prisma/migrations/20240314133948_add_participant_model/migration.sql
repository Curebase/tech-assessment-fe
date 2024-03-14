-- CreateTable
CREATE TABLE "Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "hasDiabetes" BOOLEAN NOT NULL DEFAULT false,
    "hasCovid" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "_ParticipantToTrial" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ParticipantToTrial_A_fkey" FOREIGN KEY ("A") REFERENCES "Participant" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ParticipantToTrial_B_fkey" FOREIGN KEY ("B") REFERENCES "Trial" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ParticipantToTrial_AB_unique" ON "_ParticipantToTrial"("A", "B");

-- CreateIndex
CREATE INDEX "_ParticipantToTrial_B_index" ON "_ParticipantToTrial"("B");
