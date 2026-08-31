# Challenge
import math


class Circle:
    def __init__(self, radius):
        if radius <= 0:
            raise ValueError("Radius must be positive")
        self.radius = radius

    @classmethod
    def from_diameter(cls, diameter):
        return cls(diameter / 2)

    @property
    def diameter(self):
        return self.radius * 2

    def area(self):
        return math.pi * self.radius ** 2

    def __str__(self):
        return f"Circle(radius={self.radius}, diameter={self.diameter})"

    __repr__ = __str__

    def __add__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return Circle(self.radius + other.radius)

    def __gt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius > other.radius

    def __eq__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius == other.radius

    def __lt__(self, other):
        if not isinstance(other, Circle):
            return NotImplemented
        return self.radius < other.radius


circle1 = Circle(5)
circle2 = Circle.from_diameter(10)
circle3 = Circle(3)

print(circle1)
print(f"Area: {circle1.area():.2f}")
print(f"Radius: {circle2.radius}")
print(f"Diameter: {circle2.diameter}")
print(f"Added circles: {circle1 + circle3}")
print(circle1 > circle3)
print(circle1 == circle2)

circles = [circle1, circle2, circle3]
print(sorted(circles))
