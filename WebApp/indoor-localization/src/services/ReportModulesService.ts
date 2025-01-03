import { ReportModule } from "../interfaces/ReportModule";

class ReportModulesService {
  private static modules: ReportModule[] = [];

  /**
   * Sets the list of report modules.
   * @param modules Array of ReportModule instances.
   */
  public static SetModules(modules: ReportModule[]): void {
    this.modules = modules;
  }

  /**
   * Retrieves all the report modules.
   * @returns Array of ReportModule instances.
   */
  public static GetAllModules(): ReportModule[] {
    return this.modules;
  }
}

export default ReportModulesService;
