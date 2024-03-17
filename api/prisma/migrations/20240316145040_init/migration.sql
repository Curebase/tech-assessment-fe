-- CreateTable
CREATE TABLE "Trial" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Trial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "hasDiabetes" BOOLEAN NOT NULL DEFAULT false,
    "hadCovid" BOOLEAN NOT NULL DEFAULT false,
    "enrolledDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParticipantToTrial" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ParticipantToTrial_AB_unique" ON "_ParticipantToTrial"("A", "B");

-- CreateIndex
CREATE INDEX "_ParticipantToTrial_B_index" ON "_ParticipantToTrial"("B");

-- AddForeignKey
ALTER TABLE "_ParticipantToTrial" ADD CONSTRAINT "_ParticipantToTrial_A_fkey" FOREIGN KEY ("A") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTrial" ADD CONSTRAINT "_ParticipantToTrial_B_fkey" FOREIGN KEY ("B") REFERENCES "Trial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
