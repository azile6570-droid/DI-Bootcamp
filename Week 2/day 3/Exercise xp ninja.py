# Exercise 1 
class Temperature(ABC):
    def __init__(self, value: float):
        self.value = float(value)

    @abstractmethod
    def to_celsius(self) -> float:
        """Convert the temperature to Celsius."""
        raise NotImplementedError

    @classmethod
    @abstractmethod
    def from_celsius(cls, value: float) -> Temperature:
        """Create a temperature from Celsius."""
        raise NotImplementedError

    def convert_to(self, temperature_type: type[Temperature]) -> Temperature:
        if not issubclass(temperature_type, Temperature):
            raise TypeError("Target must be a Temperature subclass.")

        return temperature_type.from_celsius(self.to_celsius())

    def __repr__(self):
        return f"{self.__class__.__name__}({self.value:.2f})"


class Celsius(Temperature):
    def to_celsius(self):
        return self.value

    @classmethod
    def from_celsius(cls, value):
        return cls(value)


class Kelvin(Temperature):
    def __init__(self, value):
        if value < 0:
            raise ValueError("Kelvin temperature cannot be negative.")
        super().__init__(value)

    def to_celsius(self):
        return self.value - 273.15

    @classmethod
    def from_celsius(cls, value):
        return cls(value + 273.15)


class Fahrenheit(Temperature):
    def to_celsius(self):
        return (self.value - 32) * 5 / 9

    @classmethod
    def from_celsius(cls, value):
        return cls(value * 9 / 5 + 32)


print(Celsius(25).convert_to(Fahrenheit))
print(Kelvin(273.15).convert_to(Celsius))


# Exercise 2
class QuantumParticle:
    def __init__(self, x=None, y=None, p=None):
        self._position = x if x is not None else random.randint(1, 10_000)
        self._momentum = y if y is not None else random.random()
        self._spin = p if p in (0.5, -0.5) else random.choice((0.5, -0.5))
        self._entangled_particle = None

    def _disturb(self):
        self._position = random.randint(1, 10_000)
        self._momentum = random.random()
        print("Quantum Interferences!!")

    def position(self):
        self._disturb()
        return self._position

    def momentum(self):
        self._disturb()
        return self._momentum

    def spin(self):
        self._spin = random.choice((0.5, -0.5))

        if self._entangled_particle is not None:
            self._entangled_particle._spin = -self._spin

        self._disturb()
        return self._spin

    def entangle(self, other):
        if not isinstance(other, QuantumParticle):
            raise TypeError("A particle can only be entangled with another QuantumParticle.")

        self._entangled_particle = other
        other._entangled_particle = self

        print("Spooky Action at a Distance !!")

    def __repr__(self):
        return (
            f"QuantumParticle(position={self._position}, "
            f"momentum={self._momentum:.3f}, spin={self._spin})"
        )


p1 = QuantumParticle(x=1, p=0.5)
p2 = QuantumParticle(x=2, p=-0.5)

p1.entangle(p2)
print(p1)
print(p2)

print(f"Measured spin: {p1.spin()}")
print(f"Opposite spin: {p2._spin}")
from __future__ import annotations

from abc import ABC, abstractmethod
import random


