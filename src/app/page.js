import Image from "next/image";
import React from "react";

import { Container, Grid } from "@mui/material";
import styles from "./page.module.css";
import Appbar from "./components/Headers/Appbar";
import Layout from "./components/layout/Layout";
import { DrapDropProvider } from "./Context/DragDropContext/DragDropContext";
import { SchedulerProvider } from "./Context/SchedulerContext/SchedulerContext";

export default function Home() {
  return (
    <>
      <SchedulerProvider>
        <DrapDropProvider>
          <Appbar />
          <Layout />
        </DrapDropProvider>
      </SchedulerProvider>
    </>
  );
}
