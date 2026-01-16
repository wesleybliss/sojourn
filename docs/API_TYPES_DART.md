# API Data Models (Dart)

This document provides Dart class definitions for the data models used in the API, based on the server-side schema and responses.

## Response Wrapper

Standard API response wrapper.

```dart
class ApiResponse<T> {
  final bool success;
  final T? data;
  final String? error;
  final String? message;
  final int? count;

  ApiResponse({
    required this.success,
    this.data,
    this.error,
    this.message,
    this.count,
  });

  factory ApiResponse.fromJson(Map<String, dynamic> json, T Function(Object? json) fromJsonT) {
    return ApiResponse<T>(
      success: json['success'] as bool,
      data: json['data'] != null ? fromJsonT(json['data']) : null,
      error: json['error'] as String?,
      message: json['message'] as String?,
      count: json['count'] as int?,
    );
  }
}
```

## Models

### User

```dart
class User {
  final int id;
  final String email;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  User({
    required this.id,
    required this.email,
    this.createdAt,
    this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] as int,
      email: json['email'] as String,
      createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.tryParse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}
```

### Trip

```dart
class Trip {
  final int id;
  final int userId;
  final String name;
  final String? description;
  final String? coverImageUrl;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final DateTime? startDate;
  final DateTime? endDate;
  final int? segmentCount; // Present if `withCounts=true`
  final List<Plan>? plans; // Present if `withDetails=true`

  Trip({
    required this.id,
    required this.userId,
    required this.name,
    this.description,
    this.coverImageUrl,
    this.createdAt,
    this.updatedAt,
    this.startDate,
    this.endDate,
    this.segmentCount,
    this.plans,
  });

  factory Trip.fromJson(Map<String, dynamic> json) {
    return Trip(
      id: json['id'] as int,
      userId: json['userId'] as int,
      name: json['name'] as String,
      description: json['description'] as String?,
      coverImageUrl: json['coverImageUrl'] as String?,
      createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.tryParse(json['updatedAt']) : null,
      startDate: json['startDate'] != null ? DateTime.tryParse(json['startDate']) : null,
      endDate: json['endDate'] != null ? DateTime.tryParse(json['endDate']) : null,
      segmentCount: json['segmentCount'] as int?,
      plans: json['plans'] != null 
          ? (json['plans'] as List).map((e) => Plan.fromJson(e as Map<String, dynamic>)).toList() 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'name': name,
      'description': description,
      'coverImageUrl': coverImageUrl,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
      'startDate': startDate?.toIso8601String(),
      'endDate': endDate?.toIso8601String(),
      'segmentCount': segmentCount,
      'plans': plans?.map((e) => e.toJson()).toList(),
    };
  }
}
```

### Plan

```dart
class Plan {
  final int id;
  final int tripId;
  final String name;
  final String? description;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final List<Segment>? segments;

  Plan({
    required this.id,
    required this.tripId,
    required this.name,
    this.description,
    this.createdAt,
    this.updatedAt,
    this.segments,
  });

  factory Plan.fromJson(Map<String, dynamic> json) {
    return Plan(
      id: json['id'] as int,
      tripId: json['tripId'] as int,
      name: json['name'] as String,
      description: json['description'] as String?,
      createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.tryParse(json['updatedAt']) : null,
      segments: json['segments'] != null 
          ? (json['segments'] as List).map((e) => Segment.fromJson(e as Map<String, dynamic>)).toList() 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'tripId': tripId,
      'name': name,
      'description': description,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
      'segments': segments?.map((e) => e.toJson()).toList(),
    };
  }
}
```

### Segment

```dart
class Segment {
  final int id;
  final int tripId;
  final int planId;
  final String name;
  final String? description;
  final DateTime startDate;
  final DateTime endDate;
  final double? coordsLat;
  final double? coordsLng;
  final String color;
  final bool flightBooked;
  final bool stayBooked;
  final bool isShengenRegion;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Segment({
    required this.id,
    required this.tripId,
    required this.planId,
    required this.name,
    this.description,
    required this.startDate,
    required this.endDate,
    this.coordsLat,
    this.coordsLng,
    required this.color,
    required this.flightBooked,
    required this.stayBooked,
    required this.isShengenRegion,
    this.createdAt,
    this.updatedAt,
  });

  factory Segment.fromJson(Map<String, dynamic> json) {
    return Segment(
      id: json['id'] as int,
      tripId: json['tripId'] as int,
      planId: json['planId'] as int,
      name: json['name'] as String,
      description: json['description'] as String?,
      startDate: DateTime.parse(json['startDate']),
      endDate: DateTime.parse(json['endDate']),
      coordsLat: (json['coordsLat'] as num?)?.toDouble(),
      coordsLng: (json['coordsLng'] as num?)?.toDouble(),
      color: json['color'] as String,
      flightBooked: json['flightBooked'] as bool? ?? false,
      stayBooked: json['stayBooked'] as bool? ?? false,
      isShengenRegion: json['isShengenRegion'] as bool? ?? false,
      createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.tryParse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'tripId': tripId,
      'planId': planId,
      'name': name,
      'description': description,
      'startDate': startDate.toIso8601String(),
      'endDate': endDate.toIso8601String(),
      'coordsLat': coordsLat,
      'coordsLng': coordsLng,
      'color': color,
      'flightBooked': flightBooked,
      'stayBooked': stayBooked,
      'isShengenRegion': isShengenRegion,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}
```

### Place

```dart
class Place {
  final int? id;
  final String name;
  final String? coverImageUrl;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Place({
    this.id,
    required this.name,
    this.coverImageUrl,
    this.createdAt,
    this.updatedAt,
  });

  factory Place.fromJson(Map<String, dynamic> json) {
    return Place(
      id: json['id'] as int?,
      name: json['name'] as String,
      coverImageUrl: json['coverImageUrl'] as String?,
      createdAt: json['createdAt'] != null ? DateTime.tryParse(json['createdAt']) : null,
      updatedAt: json['updatedAt'] != null ? DateTime.tryParse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'coverImageUrl': coverImageUrl,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}
```
