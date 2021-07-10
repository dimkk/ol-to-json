import ol2json from '../src/index';

describe('integration, test whole convert process', () => {
    const testString = `
      GGG: Please allow white sockets to meet trade site \r\n socket requirements when selected. If \r\n I ask for 6L blue, some of those being white would still meet the criteria.\r\n
      1. A checkbox "allow substitution with white" for socket color search would be even cooler.\r\n
      1.1. But why? Why would I need that? Why would I ever uncheck that box? Is there any (except for 2-3 specific irrelevant uniques) reason why I would rather have colored sockets instead of whites?\r\n
      1.1.1. The few items that change stat according to socket colours\r\n
      1.1.2. Addicted to Jousis voice\r\n
      1.2. Im holding on to the hope that some future unique will be relevant? Choice is always good.\r\n
      1.3. I mean sure, but given that almost nobody would ever NOT tick the box, it should rather be\r\n
      "disallow substitution with white" for the edge cases. Otherwise it would just mean\r\n
      more unnecessary clicking per search.\r\n
      2. I personally prefer ticking something if it applies, instead of unticking if it doesn't, but yes that would absolutely work too.\r\n
    `;
    it('should have property header', async () => {
        let result = ol2json(testString, '\r\n');

        expect(result).toHaveProperty('header');
    });
    it('should have property 1', async () => {
        let result = ol2json(testString, '\r\n');
        expect(result).toHaveProperty('1');
    });
    it('should have property 1.2', async () => {
        let result = ol2json(testString, '\r\n');
        expect(result['1']).toHaveProperty('2');
    });
    it('should have property 1.1.2', async () => {
        let result = ol2json(testString, '\r\n');
        expect(result['1']['1']).toHaveProperty('2');
    });
    it('should have property 2', async () => {
        let result = ol2json(testString, '\r\n');
        expect(result).toHaveProperty('2');
    });

    it('should have "hose being" in substring of property header', async () => {
        let result = ol2json(testString, '\r\n');
        expect(result.header).toContain('hose being');
    });
    it('should have "re unnecessary clicking per sear" in substring of property 1.3', async () => {
        let result = ol2json(testString, '\r\n');
        expect(result['1']['3'].text).toContain('re unnecessary clicking per sear');
    });
});
