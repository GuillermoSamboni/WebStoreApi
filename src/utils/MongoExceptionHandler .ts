import { ConflictException, Catch } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionHandler {
  catch(error: MongoError) {
    if (error.code === 11000) {
      const fieldName = Object.keys(error.cause) // Obtiene el nombre del campo que ha causado la violación de restricción única
      const message = `Duplicate value found for field '${fieldName}'`; // Crea un mensaje de error descriptivo
      throw new ConflictException(message);
    }

    throw error;
  }
}