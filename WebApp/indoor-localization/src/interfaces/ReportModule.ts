import React from "react";

export interface ReportModule {
  /**
   * Returns the icon/image for the report.
   */
  GetIcon(): string;

  /**
   * Returns the name of the report.
   */
  GetName(): string;

  /**
   * Returns the URL route string for the report page.
   */
  GetUrl(): string;

  /**
   * Returns the React component associated with the report.
   */
  GetComponent(): React.ReactNode;
}
