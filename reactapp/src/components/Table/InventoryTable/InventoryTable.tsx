import { useMemo, useState, useEffect, ChangeEvent } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_RowSelectionState,
  MRT_Row,
} from "material-react-table";
import { DeviceAPI, DeviceAPIResponse } from "../../../apis/InventoryApi";
import { Device } from "../../../models/Device";
import "./InventoryTable.scss";
import { Alert, AlertTitle, Button, Snackbar } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { download, generateCsv, mkConfig } from "export-to-csv";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Papa from "papaparse";
import { Batch } from "../../../models/Batch";

export default function InventoryTable() {
  const [data, setData] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(true);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isRefetching) return;
      setIsLoading(true);
      try {
        const data = await readData();
        setData(data as Device[]);
      } catch (error) {
        console.log(error);
        return;
      }
      setIsLoading(false);
      setIsRefetching(false);
      setRowSelection({});
    };
    fetchData();
  }, [isRefetching]);

  const readData = async (data?: any) => {
    return await DeviceAPI.getAll();
  };

  const csvConfig = mkConfig({
    filename: "selected_inventory",
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportSelectedRows = (rows: MRT_Row<Device>[]) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData as any);
    download(csvConfig)(csv);
  };

  const setSelectedFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      Papa.parse(file as any, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          let batch: Batch = {
            additions: [],
            deletions: [],
          };
          results.data.forEach((row: any) => {
            const device: Device = {
              category: row.category,
              type: row.type,
              size: row.size,
              count: row.count,
              grade: row.grade,
              location: row.location,
              campaign: row.campaign,
            } as Device;

            if (row.action === "ADD") {
              batch.additions.push(device);
            }
            if (row.action === "REMOVE") {
              batch.deletions.push(device);
            }
          });
          handleCrudResponse(await DeviceAPI.update(batch));
          e.target.value = "";
        },
      });
    }
  };

  const handleCrudResponse = async (response: DeviceAPIResponse) => {
    if (response) {
      setIsSuccess(response.isSuccess);
      setDisplayMessage(response.displayMessage);
      setIsRefetching(response.isRefetching);
      setOpenSnackBar(true);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Device>[]>(
    () => [
      {
        accessorKey: "category",
        header: "Category",
        size: 50,
        enableGrouping: true,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 50,
        enableGrouping: true,
      },
      {
        accessorKey: "size",
        header: "Size",
        size: 50,
        enableGrouping: false,
      },
      {
        accessorKey: "count",
        header: "Count",
        size: 50,
        enableGrouping: false,
      },
      {
        accessorKey: "grade",
        header: "Grade",
        size: 50,
        enableGrouping: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
    },
    state: {
      isLoading,
      rowSelection,
    },
    muiCircularProgressProps: {
      color: "secondary",
      thickness: 5,
      size: 55,
    },
    muiSkeletonProps: {
      animation: "pulse",
      height: 28,
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "rgb(244, 246, 248)",
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        backgroundColor: "rgb(255, 255, 255)",
        color: "rgb(33, 43, 54)",
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        borderRadius: "16px",
        zIndex: "0",
      },
    },
    muiSearchTextFieldProps: {
      size: "medium",
      variant: "outlined",
      label: "Search",
      fullWidth: true,
      //sx: {
      //    flex: 1,
      //},
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    enableColumnFilterModes: true,
    enableGrouping: true,
    enableColumnDragging: false,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    positionGlobalFilter: "left",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
  });

  return (
    <>
      <div className="import-export-buttons">
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Import Inventory
          <input
            accept="csv/*"
            type="file"
            id="import-file-upload"
            style={{ display: "none" }}
            onChange={(e) => setSelectedFile(e)}
          />
        </Button>
        <Button
          variant="contained"
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() =>
            handleExportSelectedRows(table.getSelectedRowModel().rows)
          }
          startIcon={<DownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </div>
      <MaterialReactTable table={table} />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackBar(false)}
      >
        <Alert
          severity={isSuccess ? "success" : "error"}
          onClose={() => setOpenSnackBar(false)}
        >
          <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
          {displayMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
