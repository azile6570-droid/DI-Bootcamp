# Challenge
import random


class Gene:
    def __init__(self, value=None):
        self.value = random.choice([0, 1]) if value is None else value

    def mutate(self):
        self.value = 1 - self.value


class Chromosome:
    def __init__(self, genes=None):
        self.genes = genes or [Gene() for _ in range(10)]

    def mutate(self):
        number_to_mutate = random.randint(1, len(self.genes))

        for gene in random.sample(self.genes, number_to_mutate):
            if random.choice([True, False]):
                gene.mutate()


class DNA:
    def __init__(self, chromosomes=None):
        self.chromosomes = chromosomes or [Chromosome() for _ in range(10)]

    def mutate(self):
        number_to_mutate = random.randint(1, len(self.chromosomes))

        for chromosome in random.sample(self.chromosomes, number_to_mutate):
            chromosome.mutate()

    def is_all_ones(self):
        return all(
            gene.value == 1
            for chromosome in self.chromosomes
            for gene in chromosome.genes
        )

    def fitness(self):
        return sum(
            gene.value
            for chromosome in self.chromosomes
            for gene in chromosome.genes
        )

    def copy(self):
        return DNA(
            [
                Chromosome([Gene(gene.value) for gene in chromosome.genes])
                for chromosome in self.chromosomes
            ]
        )


class Organism:
    def __init__(self, dna, environment):
        self.dna = dna
        self.environment = environment

    def mutate(self):
        if random.random() < self.environment:
            self.dna.mutate()


population_size = 100
environment = 0.5
organisms = [
    Organism(DNA(), environment)
    for _ in range(population_size)
]

generation = 0

while True:
    generation += 1

    for organism in organisms:
        organism.mutate()

        if organism.dna.is_all_ones():
            print(f"Perfect DNA found after {generation} generations.")
            raise SystemExit

    # Keep the fittest organisms and create mutated offspring.
    organisms.sort(key=lambda organism: organism.dna.fitness(), reverse=True)
    survivors = organisms[:population_size // 2]

    organisms = survivors + [
        Organism(survivor.dna.copy(), environment)
        for survivor in survivors
    ]
