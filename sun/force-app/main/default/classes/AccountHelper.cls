public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Owner.Name, Industry,
                Phone, Website, AnnualRevenue
            FROM Account
            WHERE Industry = 'Financial Services'];
    }
}