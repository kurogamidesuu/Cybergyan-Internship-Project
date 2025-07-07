# ModSecurity WAF Setup with OWASP CRS

This guide explains how I implemented a Web Application Firewall using Apache2, ModSecurity, and OWASP CRS to protect my local MERN stack dashboard from common attacks like XSS and SQL Injection.

## Tools Used
- Ubuntu 22.04
- Apache2
- ModSecurity v2.9.5
- OWASP CRS v3.3.7
- curl (for testing payloads)

## Steps Summary
1. **Installed ModSecurity**
   ```bash
   sudo apt install libapache2-mod-security2
   sudo a2enmod security2
   ```
2. **Cloned OWASP CRS**
    ```bash
    sudo rm -rf /usr/share/modsecurity-crs/
    git clone https://github.com/coreruleset/coreruleset.git /usr/share/modsecurity-crs
    ```
3. **Renamed the `crs-setup.conf.example` & `modsecurity.conf-recommended` file**
    ```bash
    sudo mv /usr/share/modsecurity-crs/crs-setup.conf.example /usr/share/modescurity/crs-setup.conf
    sudo mv /etc/modsecurity/modsecurity.conf-recommended /etc/modsecurity/modsecurity.conf
    ```
4. **Edited the `SecRuleEngine` option in `modsecurity.conf` file**
    ```bash
    sudo vim /etc/modsecurity/modsecurity.conf
    ```
    ```bash
    # it was 'DetectionOnly' before, change it to 'On'
    SecRuleEngine On
    ```
5. **Updated Apache Config**
    ```bash
    sudo vim /etc/apache2/apache2.conf
    ```

    ```bash
    # add this code in the file
    <IfModule security2_module>
        Include /etc/modsecurity/modsecurity.conf
        Include /usr/share/modsecurity-crs/crs-setup.conf
        Include /usr/share/modsecurity-crs/rules/*.conf
    </IfModule>
    ```
6. **Updated the enabled-sites config (optional)**
    ```bash
    sudo vim /etc/apache2/sites-enabled/000-default.conf
    ```
    ```bash
    # add this code in the file
    SecRuleEngine On

    <IfModule security2_module>
        Include /etc/modsecurity/modsecurity.conf
        Include /usr/share/modsecurity-crs/crs-setup.conf
        Include /usr/share/modsecurity-crs/rules/*.conf
    </IfModule>
    ```
4. **Restarted Apache**
    ```bash
    sudo systemctl restart apache2
    ```
5. **Testing**
    - Sent malicious payloads:
      ```bash
        curl -X POST -d "<script>alert('XSS')</script>" http://localhost
        
        curl "http://localhost/?id=1' OR '1'='1"
      ```
    - ✅ Blocked with 403 Forbidden.

Full logs and evidence in /screenshots folder.