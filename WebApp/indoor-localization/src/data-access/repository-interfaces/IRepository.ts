export interface IRepository<T> {
    /**
     * Gets a single entity by its ID.
     * @param id - The ID of the entity.
     * @returns The entity of type T.
     */
    Get(id: number): Promise<T | null>;
  
    /**
     * Gets all entities.
     * @returns A list of entities of type T.
     */
    GetAll(): Promise<T[]>;
  
    /**
     * Adds a new entity.
     * @param entity - The entity to add.
     * @returns A boolean indicating whether the operation was successful.
     */
    Add(entity: T): Promise<boolean>;
  
    /**
     * Deletes an entity by its ID.
     * @param id - The ID of the entity to delete.
     * @returns A boolean indicating whether the operation was successful.
     */
    Delete(id: number): Promise<boolean>;
  
    /**
     * Updates an existing entity.
     * @param entity - The entity to update.
     * @returns A boolean indicating whether the operation was successful.
     */
    Update(entity: T): Promise<boolean>;
  }
  