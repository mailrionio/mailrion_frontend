import { indexedDBName } from "@/components/CustomEditor/config/plugins.config";
import { IGrapesCanvas } from "@/components/CustomEditor/config";
import { ICampaignData } from "@/redux/features/campaign/service";

type IDBKey = string | number | Date;

export interface Page {
  pageId: string;
  canvasData: object;
}

interface IDBOptions {
  dbName: string; // Name of the database
  version: number; // Version of the database
  storeName: string; // Name of the object store
}

export type ManagerState = {
  style: boolean;
  layer: boolean;
  email: boolean;
};

export const dbOptions: IDBOptions = {
  dbName: indexedDBName,
  version: 1,
  storeName: "pages",
};

export const dbCampaignOpts: IDBOptions = {
  dbName: "campaignDB",
  version: 1,
  storeName: "campaigns",
};

export interface IPageIndexedDB {
  userId: string;
  pageId: string;
  canvasData: IGrapesCanvas;
  assets: {
    type: string;
    src: string;
    unitDim: string;
    height: number;
    width: number;
    name?: string;
  }[];
  styles: Array<any>;
  pages: {
    frames: {
      component: {
        type: string;
        stylable: string[];
        components: Array<Record<string, any>>;
        head: { type: string };
        docEl: { tagName: string };
      };
      id: string;
    }[];
    type: string;
    id: string;
  }[];
  symbols: Array<any>;
  dataSources: Array<any>;
  content: {
    html: string;
    css?: string;
    headContent?: string;
  };
}

interface ICampaign extends IPageIndexedDB {
  campaignId: string;
  campaign: Omit<ICampaignData, "email_builder">;
}

export type ICampaignDB = Omit<ICampaign, "pageId">;

export class IndexedDBCrud<T> {
  private dbName: string;
  private version: number;
  private storeName: string;

  constructor({ dbName, version, storeName }: IDBOptions) {
    this.dbName = dbName;
    this.version = version;
    this.storeName = storeName;
  }

  /**
   * Open or create the database
   */
  private openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Ensure all required object stores exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = () => {
        // console.log("Database opened successfully:", request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Error opening database:", request.error);
        reject(request.error);

        // Optionally delete and recreate database on critical errors
        if (request.error?.name === "NotFoundError") {
          indexedDB.deleteDatabase(this.dbName);
          location.reload();
        }
      };
    });
  }

  /**
   * Add data in the object store
   */
  async save(data: T): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.add(data);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Update data in the object store
   */
  async update(key: IDBKey, data: T): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.put(data, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Retrieve data by key
   */
  async get(key: IDBKey): Promise<T | undefined> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);

      const request = store.get(key);

      request.onsuccess = () => resolve(request.result as T | undefined);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Retrieve all data from the object store
   */
  async getAll(): Promise<T[]> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);

      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Delete data by key
   */
  async delete(key: IDBKey): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Clear all data from the object store
   */
  async clear(): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
