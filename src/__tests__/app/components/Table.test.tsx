import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Table, { TColumn } from '../../../app/components/Table/Table';
import { PatientEntity } from '../../../adapters/patientsDataAdapter';

describe('Table component', () => {
    const columns: TColumn<PatientEntity>[] = [
        { key: "fullName", label: 'Full name' },
        { key: "age", label: 'Age' },
        { key: 'sex', label: 'Sex' },
        { key: "vaccinationDate", label: 'Vaccination date' },
        {
            key: 'actions', label: 'Actions', align: 'right', actions: [
                { type: 'edit', label: 'Edit', onClick: jest.fn() }
            ]
        },
    ]

    it('renders Loader when loading', async () => {
        render(<Table data={null} columns={columns} isLoading={true} />);
        await waitFor(() => expect(screen.getByText(/loading.../i)).toBeInTheDocument())
    });

    it('renders NoData when data is an empty array', async () => {
        render(<Table data={[]} columns={columns} />);
        await waitFor(() => expect(screen.getByText(/no data found./i)).toBeInTheDocument())
    });

    it('renders table with the correct columns', () => {
        const data: PatientEntity[] = [
            {
                id: "patient_1",
                fullName: "Patient One",
                birthDate: "05 Sep 2017",
                age: 6,
                sex: "male",
                isVaccinated: true,
                vaccinationDate: "10 Mar 2021 21:43",
                vaccinationStatus: "done"
            },
            {
                id: "patient_2",
                fullName: "Patient Two",
                birthDate: "05 Dec 2015",
                age: 7,
                sex: "male",
                isVaccinated: false,
                vaccinationDate: "10 Mar 2025 08:00",
                vaccinationStatus: "done"
            }
        ];

        const { container } = render(<Table data={data} columns={columns} />);

        // table headers
        columns.forEach(col => expect(screen.getByText(col.label)).toBeInTheDocument())

        // table rows
        const tableBody = container.getElementsByTagName('tbody')[0]
        expect(tableBody.children.length).toBe(data.length)

        // data in row cells
        data.forEach(row => {
            Object.entries(row).forEach(([dataKey, datavalue]) => {
                if (columns.find(col => col.key === dataKey && col.key !== 'actions')) {
                    const elements = screen.getAllByText(datavalue);
                    elements.forEach(element => {
                        expect(element).toBeInTheDocument();
                    });
                }
            })
        })

        // actions
        const elements = screen.getAllByText(/edit/i);
        expect(elements.length).toBe(data.length);

        elements.forEach(element => expect(element).toBeInTheDocument())

    });
});