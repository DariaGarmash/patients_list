import { definePateintStatus } from "../../app/helpers/patientStatus";

describe('definePateintStatus', () => {
    it('should return correct status class name for different status values', () => {
        const done = definePateintStatus('done');
        expect(done).toBe('status is-success');

        const readyToSchedule = definePateintStatus('ready_to_schedule');
        expect(readyToSchedule).toBe('status is-warning');

        const overdue = definePateintStatus('overdue');
        expect(overdue).toBe('status is-danger');

        const notDone = definePateintStatus('not_done');
        expect(notDone).toBe('status is-not-started');
    });
});