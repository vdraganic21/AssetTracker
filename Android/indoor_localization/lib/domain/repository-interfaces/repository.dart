abstract class IRepository<T> {
  /// Gets a single entity by its ID.
  /// @param id - The ID of the entity.
  /// @returns The entity of type T.
  Future<T?> get(int id);

  /// Gets all entities.
  /// @returns A list of entities of type T.
  Future<List<T>> getAll();

  /// Adds a new entity.
  /// @param entity - The entity to add.
  /// @returns A boolean indicating whether the operation was successful.
  bool add(T entity);

  /// Deletes an entity by its ID.
  /// @param id - The ID of the entity to delete.
  /// @returns A boolean indicating whether the operation was successful.
  bool delete(int id);

  /// Updates an existing entity.
  /// @param entity - The entity to update.
  /// @returns A boolean indicating whether the operation was successful.
  bool update(T entity);
}
