import { LightningElement ,api, wire, track} from 'lwc';
import getAccountList from '@salesforce/apex/AccountHelper.getAccountList';
export default class LightningDatatableLWCExample extends LightningElement {
    @track columns = [{
            label: 'Account name',
            fieldName: 'Name',
            type: 'url',
            typeAttributes: { label: { fieldName: "Name" }, target: "_blank" },
            sortable: true
        },
        {
            label: 'Owner',
            fieldName: 'Owner',
            type: 'text',
            sortable: true
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'phone',
            sortable: true
        },
        {
            label: 'Website',
            fieldName: 'Website',
            type: 'url',
            sortable: true
        },
        {
            label: 'Annual Revenue',
            fieldName: 'AnnualRevenue',
            type: 'Currency',
            sortable: true
        },        
        {
            label: 'Industry',
            fieldName: 'Industry',
            type: 'text',
            sortable: true
        }
    ];
 
    @track error;
    @track accList ;
    @wire(getAccountList)
    wiredAccounts({
        error,
        data
    }) {
        if (data) {
            let baseUrl = 'https://d5f000001zyrseaa-dev-ed.lightning.force.com/';
            let currentData = [];
            data.forEach((row) => {
                    let rowData = {};
                    rowData.Name = baseUrl + row.Id;
                    rowData.Owner = row.Owner.Name;
                    rowData.Phone = row.Phone;
                    rowData.Website = row.Website;
                    rowData.AnnualRevenue = row.AnnualRevenue;
                    rowData.Industry = row.Industry;
                    currentData.push(rowData);

            });
            this.accList = currentData;
        } else if (error) {
            this.error = error;
        }
    }
}