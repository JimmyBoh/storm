
import {IScorable} from '../models';

abstract class BaseSelection
{
  abstract select(gen: IScorable[], count: number): IScorable[];

  protected compare(a: IScorable, b: IScorable) {
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

export default BaseSelection;