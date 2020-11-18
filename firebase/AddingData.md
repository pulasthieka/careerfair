# How to add Data to Firebase for testing

1. Import the `data-entry.service`

```
import { DataEntryService } from '../services/data-entry.service';
```

2. Import the necessary data. The code was created for both uploading excel files as well as JSON objects. The example is for uploading data in JSON files.

```
import Coordinatordata from '../../assets/coordinators';
import Paneldata from '../../assets/panels';
```

3. Initialize services

```
  constructor(private dataEntry: DataEntryService  )
```

4. Call the function inside the component

```
const panelJSON = Paneldata; // read json from ts
this.dataEntry.uploadPanelsToDB(panelJSON); // add panel data to database
this.dataEntry.uploadCoordinatorsToDB(coordinatorJSON); // add coordinator data to database
```

## Notes

Running multiple times will override past data.
Change collections to which the data is uploaded using the `environment.ts` file
