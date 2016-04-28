
import {IStormRecord} from '../models';

abstract class BaseSelector
{
  abstract select(gen: IStormRecord[], count: number): IStormRecord[];

  protected compare(a: IStormRecord, b: IStormRecord) {
    if (!a && !b) {
      throw new Error(`Must pass at least one result!`);
    }

    // If b is undefined...
    if (a && !b) {
      return a;
    }
    
    // If a is undefined...
    if (b && !a) {
      return b;
    }

    // If a has a greater score...    
    if (a.score > b.score) {
      return a;
    }
    
    // If b has a greater score...
    if (b.score > a.score) {
      return b;
    }
  
    // Otherwise return the first one...    
    return a;
  }
}

export default BaseSelector;