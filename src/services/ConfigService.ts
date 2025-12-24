export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
}

export interface Tab {
  id: string;
  label: string;
  icon: string;
  screen: string;
}

export interface QuickAccessItem {
  id: string;
  label: string;
  icon: string;
}

export interface Update {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: string;
}

export interface GenericItem {
  id: string;
  name: string;
  [key: string]: any; // Allow additional properties for different vendor types
}

export interface Facility {
  name: string;
  icon: string;
  description: string;
}

export interface VendorConfig {
  vendor: {
    id: string;
    name: string;
    type: 'school' | 'pharmacy' | 'retail'; // Add vendor type
    theme: Theme;
  };
  tabs: Tab[];
  screens: {
    home: {
      title: string;
      organisationName: string;
      adminName: string;
      quickAccessItems: QuickAccessItem[];
    };
    updates: {
      title: string;
      updates: Update[];
    };
    details: { // Changed from studentDetails to generic details
      title: string;
      items: GenericItem[]; // Changed from students to items
      itemLabel?: string; // Optional label for items (e.g., "Students", "Products", "Inventory")
    };
    info: { // Changed from schoolInfo to generic info
      title: string;
      name: string;
      address: string;
      phone: string;
      email: string;
      website: string;
      manager?: string; // Changed from principal to manager
      established?: string;
      totalItems?: string; // Changed from totalStudents to totalItems
      staff?: string; // Changed from teachers to staff
      facilities?: Facility[]; // Keep for schools, optional for others
      services?: Facility[]; // Add services for pharmacies/retail
    };
  };
  drawer: {
    menuItems: Array<{
      id: string;
      label: string;
      screen?: string;
      action?: string;
      icon: string;
    }>;
  };
}

class ConfigService {
  private config: VendorConfig | null = null;
  private currentVendor: string = 'myschool'; // Default vendor

  constructor(vendor: string = 'myschool') {
    this.currentVendor = vendor;
    this.loadConfig();
  }

  private loadConfig(): void {
    try {
      // Load different JSON files based on vendor
      let configFile;
      switch (this.currentVendor) {
        case 'myschool':
          configFile = require('../config/myschool.json');
          break;
        case 'sunshine':
          configFile = require('../config/sunshine.json');
          break;
        case 'pharmacy':
          configFile = require('../config/pharmacy.json');
          break;
        default:
          configFile = require('../config/myschool.json');
      }
      this.config = configFile as VendorConfig;
      console.log(`[ConfigService] Loaded config: ${JSON.stringify(this.config)}`);
    } catch (error) {
      console.error('Failed to load configuration:', error);
      throw new Error('Configuration loading failed');
    }
  }

  switchVendor(vendor: string): void {
    this.currentVendor = vendor;
    console.log(`[ConfigService] Switching to vendor: ${vendor}`);
    this.loadConfig();
  }

  getConfig(): VendorConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config;
  }

  getTheme(): Theme {
    return this.getConfig().vendor.theme;
  }

  getTabs(): Tab[] {
    return this.getConfig().tabs;
  }

  getScreenData(screen: keyof VendorConfig['screens']) {
    return this.getConfig().screens[screen];
  }

  // Backward compatibility methods
  getStudentDetails() {
    return this.getConfig().screens.details;
  }

  getSchoolInfo() {
    return this.getConfig().screens.info;
  }

  getDrawerMenuItems() {
    return this.getConfig().drawer.menuItems;
  }

  getVendorInfo() {
    return this.getConfig().vendor;
  }

  // New methods for generic access
  getDetailsItems() {
    return this.getConfig().screens.details.items;
  }

  getInfoData() {
    return this.getConfig().screens.info;
  }

  getVendorType() {
    return this.getConfig().vendor.type;
  }
}

export const configService = new ConfigService();

// Export a function to switch vendors
export const switchVendor = (vendor: string) => {
  configService.switchVendor(vendor);
};