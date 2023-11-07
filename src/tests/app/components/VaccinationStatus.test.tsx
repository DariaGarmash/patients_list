import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { definePateintStatus } from '../../../app/helpers/patientStatus';
import VaccinationStatus, { VaccinationStatusProps } from '../../../app/components/patientDetails/VaccinationStatus';


const getDatepickerHTMLElement = () => (
    document.getElementsByClassName('flatpickr-input')[0] as HTMLInputElement
)

describe('VaccinationStatus component', () => {
    const mockChangeHandler = jest.fn();

    const mockPatient: VaccinationStatusProps = {
        isVaccinated: true,
        vaccinationDate: '2023-11-06 01:00',
        vaccinationStatus: 'done',
        onChange: mockChangeHandler,
    };

    it('should render the VaccinationStatus component correctly', () => {
        render(<VaccinationStatus {...mockPatient} />);

        const statusBadge = screen.getByText(mockPatient.vaccinationStatus);

        expect(statusBadge).toHaveClass(definePateintStatus(mockPatient.vaccinationStatus));
        expect(screen.getByText(mockPatient.isVaccinated ? /vaccinated/i : /not vaccinated/i)).toBeInTheDocument();
        expect(screen.getByText('Date:')).toBeInTheDocument();
        expect(getDatepickerHTMLElement().value).toBe('2023-11-06 01:00');
    });

    it('should disable datepicker when vaccinated', () => {
        render(<VaccinationStatus {...mockPatient} />);
        const datepicker = getDatepickerHTMLElement();

        expect(datepicker).toHaveAttribute('disabled');
    });

    it.only('should handle date change when not vaccinated', async () => {
        const notVaccinatedPatient: VaccinationStatusProps = {
            ...mockPatient,
            isVaccinated: false,
        };

        const { container, debug } = render(<VaccinationStatus {...notVaccinatedPatient} />);

        const datepicker = getDatepickerHTMLElement();

        expect(datepicker).not.toHaveAttribute('disabled');
    });


});